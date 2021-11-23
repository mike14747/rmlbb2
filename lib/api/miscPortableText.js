import queryData from '../helpers/queryData';

export async function getRecruitingContent() {
    const query = encodeURIComponent('*[_type == "miscPortableText" && title == "Recruiting" && active == true][0]{content}');
    return queryData(query);
}

export async function getConstitutionContent() {
    const query = encodeURIComponent('*[_type == "miscPortableText" && title == "Constitution" && active == true][0]{content}');
    return queryData(query);
}

export async function getArticlesHomeText() {
    const query = encodeURIComponent('*[_type == "miscPortableText" && title == "ArticlesHome" && active == true][0]{content}');
    return queryData(query);
}
