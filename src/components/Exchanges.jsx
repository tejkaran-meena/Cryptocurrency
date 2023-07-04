import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import { transform } from 'framer-motion';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchExchanges = async () => {
     
      try {
        const { data } = await axios.get(`${server}/exchanges?`);
        // console.log(data);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true); setLoading(false);  
      }
    };


    fetchExchanges();

  }, [])
    
    if (error) return  <ErrorComponent message={'error while fetching exchanges'}/>
    
  return (

    <div>
      <Container maxW={'container.xl'}  padding={'2rem'} >
        {loading ? <Loader /> : (
          <>
            <HStack wrap={'wrap'}  padding={'2rem'} justify={'space-evenly'}>

              {exchanges.map((i) => (
                <ExchangeCard
                  key={i.id}
                  name={i.name}
                  img={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}

                />

              )

              )}


            </HStack>
          </>
        )
        }
      </Container>

    </div>
  )
}





const ExchangeCard = ({ name, img, rank, url }) => {

  return (
    <>
      <a href={url} target={'blank'}  >
        <VStack w={'52'} shadow={'lg'} padding={'8'} margin={'1'} borderRadius={'lg'} transition={'all 0.3s'}

          css={{
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}

        // _hover={{transform:'scale(1.1)'}} another way of giving hover in chakra UI

        >
          <Image src={img} w={'100'} h={'100'} objectFit={'contain'} alt={'eexchange'} />
          <Heading size={'md'} noOfLines={1}>{rank}</Heading>
          <Text noOfLines={1}>{name}</Text>
        </VStack>
      </a>
    </>
  )

}




export default Exchanges;