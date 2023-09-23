import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { server } from '../index';
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';          
import Error from './Error';


const Exchange = () => {
  const [Exchanges,setExchanges] = useState([]);
  const [loading,setloading] = useState(true);
  const [error,seterror] = useState(false);

  useEffect(()=>{
    const fetchexchanges = async()=>{
      try {
        const { data } = await axios.get(`${server}/exchanges`);
      setExchanges(data);
      setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    }  ;
    fetchexchanges();
  },[]) 
  if(error) return <Error message={"error while fetching exchanges"}/>
  
  return (
    <Container maxW={'container.xl'}>
      {
        loading?<Loader/> :<>
        <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
          
          {
          Exchanges.map((i) => (
            <ExchangeCard name={i.name} img={i.image} rank={i.trust_score_rank} 
            url={i.url} key={i.id}/>
            
          ))
          }
        </HStack>
        </>
        
      }
    </Container>
  );
}
const ExchangeCard = ({name,img,rank,url})=>(
  <a href={url} target='blank'>
    <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'}
    m={4} css={{
      "&:hover" :{
        transform:'scale(1.1)'
      }
    }}>
      <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt='exchange'/>
      <Heading size={'md'} noOfLines={1}>{rank}</Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
)

export default Exchange
