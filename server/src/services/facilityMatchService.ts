import { Facility, IFacility } from '../models/Facility.js';

export interface MatchCriteria {
  requiredService?: string;
  facilityType?: string;
  maxDistanceKm?: number;
  emergencyOnly?: boolean;
}

export interface MatchedFacilityResult {
  facility: IFacility;
  matchScore: number;
  distanceKm: number;
  estimatedTravelMins: number;
  matchReasons: string[];
}

export const matchFacilities = async (criteria: MatchCriteria): Promise<MatchedFacilityResult[]> => {
  const query: any = { status: { $ne: 'CLOSED' } };

  if (criteria.facilityType && criteria.facilityType !== 'ALL') {
    query.type = criteria.facilityType;
  }

  const facilities = await Facility.find(query);

  const scored = facilities.map((fac) => {
    let score = 50; // base score
    const reasons: string[] = [];

    // Service matching
    if (criteria.requiredService) {
      const hasService = fac.services.some((s) =>
        s.toLowerCase().includes(criteria.requiredService!.toLowerCase())
      );
      if (hasService) {
        score += 30;
        reasons.push(`Offers required specialty: ${criteria.requiredService}`);
      } else {
        score -= 20;
      }
    }

    // Bed availability bonus
    if (fac.bedCapacity && fac.bedCapacity.available > 5) {
      score += 15;
      reasons.push(`${fac.bedCapacity.available} vacant beds available`);
    } else if (fac.bedCapacity && fac.bedCapacity.available > 0) {
      score += 5;
    } else {
      score -= 10;
      reasons.push('High bed occupancy');
    }

    // Queue wait time bonus
    if (fac.queue && fac.queue.avgWaitMinutes <= 20) {
      score += 10;
      reasons.push(`Low OPD wait time (~${fac.queue.avgWaitMinutes} mins)`);
    }

    // Distance consideration
    const dist = fac.distanceKm || 6.5;
    if (dist < 10) {
      score += 15;
      reasons.push(`Nearby facility (${dist.toFixed(1)} km)`);
    } else if (dist < 25) {
      score += 5;
    }

    // Travel time estimate (~30 km/h rural road average)
    const travelMins = Math.max(10, Math.round((dist / 30) * 60));

    return {
      facility: fac,
      matchScore: Math.min(100, Math.max(0, score)),
      distanceKm: dist,
      estimatedTravelMins: travelMins,
      matchReasons: reasons
    };
  });

  return scored.sort((a, b) => b.matchScore - a.matchScore);
};
