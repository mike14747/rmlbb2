import queryData from '../helpers/queryData';
import * as sft from '../../types/serverlessFunctionTypes';

export async function getChampions() {
    const query = encodeURIComponent('*[ _type == "champion"] | order(year asc){year, championTeam, championManager, runnerUpTeam, runnerUpManager}');
    const championsData: Promise<sft.Champions[]> = await queryData(query);
    return championsData;
}
