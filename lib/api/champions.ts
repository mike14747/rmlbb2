import queryData from '../helpers/queryData';
import { Champions } from '@/types/champion-types';

export async function getChampions() {
    const query = encodeURIComponent('*[ _type == "champion"] | order(year desc){year, championTeam, championManager, runnerUpTeam, runnerUpManager}');
    const championsData: Promise<Champions[]> = await queryData(query);
    return championsData;
}
