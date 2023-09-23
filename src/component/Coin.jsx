import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";
import { Link } from "react-router-dom";
import CoinDetails from './CoinDetails';

const Coin = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol =
  currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page)=>{
    setPage(page);
    setloading(true);
  }

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchcoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };
    fetchcoins();
  }, [currency, page]);
  if (error) return <Error message={"error while fetching Coins"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
        <RadioGroup value={currency} onChange={setCurrency} p={8}>
          <HStack spacing={4}>
            <Radio value="inr">INR</Radio>
            <Radio value="eur">EUR</Radio>
            <Radio value="usd">USD</Radio>
            
          </HStack>
        </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                name={i.name}
                price={i.current_price}
                img={i.image}
                symbol={i.symbol}
                key={i.id}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={'full'} overflowX={'auto'} p={8}>
            {
              btns.map((item,index)=>(
                <Button key={index} bgColor={'blackAlpha.900'} color={'white'} onClick={()=>changePage(index+1)}>
                  {index+1}
                </Button>
              ))
            }
          </HStack>
        </>
      )}
    </Container>
  );
};
const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => (
  
  <Link to={`/coin/${id}`} >
    
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={4}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt="exchange" />
      <Heading size={"md"} noOfLines={1}>
        {symbol}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
    </VStack>
  </Link>
);

export default Coin;
