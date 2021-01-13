import { GetServerSideProps } from 'next';
import * as HomeStyle from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}
interface HomeProps {
  recommendedProducts: IProduct[]
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
              {recommendedProduct.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const response = await fetch('http://localhost:3333/recommended');
    const recommendedProducts = await response.json();
    return {
      props: {
        recommendedProducts
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
