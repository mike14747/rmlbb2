import queryData from '../helpers/queryData';

export async function getChampions() {
    const query = encodeURIComponent('*[ _type == "champion"] | order(year asc){year, championTeam, championManager, runnerUpTeam, runnerUpManager}');
    return queryData(query);
}
