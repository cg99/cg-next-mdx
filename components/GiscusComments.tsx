import Giscus, { Mapping, Theme } from "@giscus/react";


export default function GiscusComments() {
    return (
        <Giscus
            id="comments"
            repo="cg99/cg-next-mdx"
            repoId="R_kgDOH_GyVQ"
            category="Blog Comments"
            categoryId="DIC_kwDOH_GyVc4CRZfS"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="preferred_color_scheme"
            lang="en"
            loading="lazy"
        />
    );
}