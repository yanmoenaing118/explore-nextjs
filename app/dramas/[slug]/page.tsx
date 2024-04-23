import { Props, generateServerSideMeta } from '@/app/utils/generateMetaTags';
import type { Metadata, ResolvingMetadata } from 'next'
 


export async function generateMetadata({params, searchParams}: Props,   parent: ResolvingMetadata): Promise<Metadata>  {
    console.log('params ', params);
    console.log('searchParams', searchParams);
    return generateServerSideMeta({params, searchParams})
}

export default function Page() {
  return <h1>Drama Details Page</h1>;
}
