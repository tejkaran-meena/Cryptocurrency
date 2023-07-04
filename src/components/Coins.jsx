import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Button, Container, HStack, Heading, Image, Radio, RadioGroup, Stack, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import { transform } from 'framer-motion';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';


const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pages, setPages] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currancySymbol = currency === 'inr' ? "₹" : currency === 'eur' ? "€" : "$";

  const changePage = (page) => {
    setPages(page);
    setLoading(true);
  }

  const btns = new Array(132).fill(1);
  

    

  useEffect(() => {
    const fetchCoins = async () => {

      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${pages}`);
        
        // console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true); setLoading(false);
      }
    };


    fetchCoins();

  }, [currency, pages])

  if (error) return <ErrorComponent message={'error while fetching coins'} />

  return (


    <div>
      <Container maxW={'container.xl'} padding={'2rem'} >
        {loading ? <Loader /> : (
          <>
              {/* imp******* chakra ui me radio group e.target.value provide nhi krta 
              esliye ham directly onChange={setCurrency} lik dete he or yeh kaam krta he */}


            <RadioGroup  padding={'8'} margin={'4'} value={currency} onChange={setCurrency} >
              <Stack direction='row'>
                <Radio value='inr'>INR</Radio>
                <Radio value='usd'>USD</Radio>
                <Radio value='eur'>EUR</Radio>
              </Stack>
            </RadioGroup>

            <HStack wrap={'wrap'} justify={'space-evenly'} padding={'2rem'}>

              {coins.map((i) => (
                <CoinCard
                  key={i.id}
                  id={i.id}
                  name={i.name}
                  img={i.image}
                  price={i.current_price}
                  symbol={i.symbol}
                  currancySymbol={currancySymbol}


                />

              )

              )}


            </HStack>

            <HStack w={'full'} p={'8'} overflowX={'auto'}>
              {btns.map((item, index) => (
                <Button key={index} bgColor={'blackAlpha.900'} color={'white'} onClick={() => changePage(index + 1)}>
                  {index + 1}
                </Button>
              ))}
            </HStack>
          </>
        )
        }
      </Container>

    </div>
  )
}





export default Coins;
