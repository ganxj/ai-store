import Link from "next/link";
import {allPosts, Post} from "~/.contentlayer/generated"
import Datetime from "~/components/Datetime";
import Pagination, {pageSize} from "~/components/Pagination";

interface PageProps {
    currentPage: number
}

function BlogPartner({currentPage}:PageProps) {
    if (!currentPage){
        currentPage = 1
    }
    const totalPage = allPosts.length%pageSize==0?allPosts.length/pageSize:Math.floor(allPosts.length/pageSize)+1

    allPosts.sort((a, b) => {
        // @ts-ignore
        return new Date(b.date) - new Date(a.date);
    });

    const postsInit = allPosts.slice((currentPage-1)*pageSize , currentPage*pageSize)
    console.log(postsInit)

    return (
        <div className="border-t">
            <div id="become-a-partner" className="max-w-2xl mx-auto space-y-12 py-12 px-6">
                <h1 className="h1">Ai Tools</h1>
                <p className="p">All the articles I've posted.</p>
                {postsInit.map((post) => (
                    <article key={post.slug}>
                        <Link href={post.slug}>
                            <a className="post-line-text"><h2>{post.title}</h2></a>
                        </Link>
                        <div className="mt-2">
                            <Datetime pubDatetime={post.date} modDatetime={post.date} />
                        </div>
                        {post.description && <p className="p text-m">{post.description}</p>}
                    </article>
                ))}

                <Pagination currentPage={currentPage} totalPages={totalPage} prevUrl={currentPage-1==1?"/posts/":"/posts/" + (currentPage-1)} nextUrl={"/posts/" + ((++currentPage))}/>

            </div>
        </div>
    )
}

export default BlogPartner
