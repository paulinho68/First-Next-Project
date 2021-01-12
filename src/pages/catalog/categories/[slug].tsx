import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';


interface ICategory {
    id: string;
    title: string;
}
interface CategoryProps {
    products: ICategory[];
}

export default function Category({ products }: CategoryProps) {
    const router = useRouter();
    return (
        <div>
            <h1>{router.query.slug}</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
//     const response = await fetch('http://localhost:3333/categories');
//     const categories = await response.json();

//     return {
//         props:{
//             categories
//         },
//         revalidate: 5
//     }
// }
export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`http://localhost:3333/categories`);
    const categories = await response.json();

    const paths = categories.map(category => {
        return {
            params: { slug: category.id }
        }
    })

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
    const { slug } = context.params;

    const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
    const products = await response.json();

    return {
        props: {
            products
        },
        revalidate: 60,
    }
}