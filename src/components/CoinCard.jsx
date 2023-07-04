import React from 'react'
import { Link } from 'react-router-dom';
import {  Heading, Image, Text, VStack } from '@chakra-ui/react';

const CoinCard = ({ id,name, img, symbol, price ,currancySymbol='₹'}) => {

    return (
      <>
        <Link to={`/coin/${id}`}>
          <VStack w={'52'} shadow={'lg'} padding={'8'} margin={'1'} borderRadius={'lg'} transition={'all 0.3s'}
  
            css={{
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
  
          // _hover={{transform:'scale(1.1)'}} another way of giving hover in chakra UI
  
          >
            <Image src={img} w={'100'} h={'100'} objectFit={'contain'} alt={'eexchange'} />
            <Heading size={'md'} noOfLines={1}>{symbol}</Heading>
            <Text noOfLines={1}>{name}</Text>
            <Text noOfLines={1}>{price? `${currancySymbol}${price}` : 'NA'}</Text>
          </VStack>
        </Link>
      </>
    )
  
  }
  

export default CoinCard;
