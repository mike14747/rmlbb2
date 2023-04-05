import queryData from '../helpers/queryData';
import { PortableContent } from '@/types/sanity-types';

export async function getRecruitingContent(): Promise<PortableContent | null> {
    const query = encodeURIComponent('*[_type == "miscPortableText" && title == "Recruiting" && active == true][0]{content}');
    const data: PortableContent = await queryData(query);
    return data;
}

export async function getConstitutionContent(): Promise<PortableContent | null> {
    const query = encodeURIComponent('*[_type == "miscPortableText" && title == "Constitution" && active == true][0]{content}');
    const data: PortableContent = await queryData(query);
    return data;
}

export async function getArticlesHomeText(): Promise<PortableContent | null> {
    const query = encodeURIComponent('*[_type == "miscPortableText" && title == "Articles Home" && active == true][0]{content}');
    const data: PortableContent = await queryData(query);
    return data;
}

export async function getPrivacyPolicyText(): Promise<PortableContent | null> {
    const query = encodeURIComponent('*[_type == "miscPortableText" && title == "Privacy Policy" && active == true][0]{content}');
    const data = await queryData(query);
    return data;
}
