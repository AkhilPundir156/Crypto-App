import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { server } from "../index";
import { useParams } from "react-router-dom";
import Error from "./Error";
import CompChart from "./CompChart";

const CoinDetails = () => {
  const params = useParams();

  const [coins, setCoins] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState('24h');
  const [chartarr, setChartarr] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns =["24h","7d","14d","30d","60d","200d","max"];

  const switchChartStats =(key) =>{

    switch (key) {
      case "24h":
        setDays("24h");
        setloading(true);
        break;
      case "7d":
        setDays("7d");
        setloading(true);
        break;
      case "14d":
        setDays("14d");
        setloading(true);
        break;
      case "30d":
        setDays("30d");
        setloading(true);
        break;
      case "60d":
        setDays("60d");
        setloading(true);
        break;
      case "200d":
        setDays("200d");
        setloading(true);
        break;
      case "max":
        setDays("max");
        setloading(true);
        break;
    
      default:
        setDays("24h");
        setloading(true);
        break;
    }

  }



  useEffect(() => {
    const fetchcoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const {data: chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)

        setCoins(data);
        setChartarr(chartData.prices);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };
    fetchcoin();
  }, [currency, params.id,days]);

  if (error) return <Error message={"error while fetching Coins"} />;



  return (
    <Container maxW={"container.xl"} >
      {loading ? (
        <Loader message={"error"} />
      ) : (
        <>
          <Box width={"full"} borderWidth={1}>
            <CompChart arr={chartarr} currency={currencySymbol} days={days}/>
          </Box>
          
          <HStack p={4} overflowX={'auto'}>
            {
              btns.map((i)=>(
                <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
              ))
            }
          </HStack>
          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={4}>
              <Radio value="inr">INR</Radio>
              <Radio value="eur">EUR</Radio>
              <Radio value="usd">USD</Radio>
            </HStack>
          </RadioGroup>
          <VStack spacing={4} p={16} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
              last Updated on{" Date "}
              {(coins.market_data.last_updated).split("T")[0]} { "Time "}
              {(coins.market_data.last_updated).split("T")[1].split(".")[0]} 
            </Text>
            <Image
              src={coins.image.large}
              w={16}
              h={16}
              objectFit={"contain"}
            />
    
            <Stat>
              <StatLabel>{coins.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coins.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coins.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coins.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
              {`#${coins.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${currencySymbol}${coins.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coins.market_data.low_24h[currency]}`}
            />
            <Box w={"full"} p={4}  >
              <Item title={"max supply"} value={coins.market_data.max_supply} />
              <Item
                title={"circulating supply"}
                value={coins.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coins.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All time Low"}
                value={`${currencySymbol}${coins.market_data.atl[currency]}`}
              />
              <Item
                title={"All time high"}
                value={`${currencySymbol}${coins.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={4}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme="teal" w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme="red" />
      <Text fontSize={"sm"}>24h ramge</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
);

export default CoinDetails;
