import { GetServerSideProps } from 'next';
import Link from 'next/link';
import * as HomeStyle from '@/styles/pages/Home';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDom from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
interface HomeProps {
  recommendedProducts: Document[]
}

export default function Home({ recommendedProducts }: HomeProps) {

  return (
    <div>
      <section>
        <HomeStyle.Title>
          Products
        </HomeStyle.Title>
        <ul>
          {recommendedProducts.map(recommendedProduct => (
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                <a>
                  {PrismicDom.RichText.asText(recommendedProduct.data.title)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const recommendedProducts = await client().query([
      Prismic.Predicates.at('document.type', 'product')
    ]);

    return {
      props: {
        recommendedProducts: recommendedProducts.results
      }
    }

  } catch (error) {
    return {
      props: {
        recommendedProducts: []
      }
    }
  }

}
