import { Props, generateServerSideMeta } from "@/app/utils/generateMetaTags";

export async function generateMetadata(props: Props) {
    return generateServerSideMeta(props);
}

export default function Page() {
    return <div>Slugs</div>
}