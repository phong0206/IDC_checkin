import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Link,
  Heading,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { useParams } from "react-router";
import { Stack, Text, Grid, GridItem, Button } from "@chakra-ui/react";
import { isMobile } from "react-device-detect";
import { BrowserView, MobileView } from "react-device-detect";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import "./index.css";
import { Image } from "@chakra-ui/react";
import img from "assets/idc_red.jpg";
import bg from "assets/bg2.jpg"
import { getCustomers, checkIn } from "api/modules/api-app/customers";
import useAPI from "hooks/useApi";
//----------------------------------------------------------------

const Home = () => {
  const bgContainer = useColorModeValue("gray.50", "gray.800");
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      const { data: res } = await getCustomers(id);
      if (res.status) {
        setUser(res.data);
      }
    };
    if (id) {
      getData();
    }
  }, []);

  const { loading, request, error } = useAPI(checkIn);

  console.log("loading...", loading);

  const handleCheckIn = async () => {
    await request(user?.stt);
    if (!error) {
      setUser({ ...user, is_check_in: 1 });
    }
  };

  ///////////////////////////////////////////////////////////// BROWSER
  const ButtonCheckIn = () => (
    <Container h="100%" align="center">
      <p className="check" />
      <Box style={{ margin: 100 }}>
        <Text
          style={{
            color: "#d1d8e0",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          You've been checked in!
        </Text>
      </Box>
      <Box
        style={{
          color: "#d1d8e0",
          fontSize: "26px",
          fontWeight: "bold",
        }}
      >
        Enjoy The Show.
      </Box>
    </Container>
  );
  const InfoUser = () => {
    return (
      <Container h="100%" top="40%" backgroundColor="#">
        <br />
        <br />
        <h2
          style={{
            color: "#ff3f34",
            fontSize: "23px",
            top: "50%",
            fontWeight: "bold",
          }}
        >
          Thông tin khách mời:
        </h2>
        <h2 className="browserfont" >{user.id},</h2>
        <h2 className="browserfont">{user.name}</h2>
        <h2 className="browserfont">{user.address}</h2>
        <h2 className="browserfont">{user.phone}</h2>
        <h2 className="browserfont">{user.email}</h2>
      </Container>
    );
  };
  const Info = () => {
    return (
      <Container h="100%">
        <Avatar left="35%" size="2xl" name={user.name} />
        <InfoUser />
      </Container>
    );
  };

  const Welcome = () => {
    return (
      <Container h="100%" align="center">
        <br />
        <br />
        <br />
        <h1 style={{ fontSize: "6vw", fontWeight: "bold" }}>
          Welcome to IDC Group!
        </h1>
        <br />
        <br />
        <Image src={img} borderRadius="full" boxSize="180px" />
        <input type="checkbox" id="select" />
        <label for="select">
          <span>Check In</span>
          <span>Working...</span>
        </label>
      </Container>
    );
  };
  /////////////////////////////////////////////////////////MOBILE////////////////////////
  const MobileButtonCheckIN = () => {
    return (
      <Container h="100%"  align = 'center' mt = '35vh'>
        {/* <Button margin= '1px' onClick={handleCheckIn}>Check In</Button> */}
        <input type="checkbox" id="select"  />
        <label for="select">
          <span onClick={handleCheckIn}  >Check In</span>
          <span>Working...</span>
        </label>
      </Container>
    );
  };
  const MoblieInfoUser = () => (
    <Container h="100%">

      <h1
        align="center"
        style={{ color: 'red', fontSize: "7vw", top: "50%",fontWeight: 'bold', textShadow: "0px 5px 5px #77325a" }}
      >
        Welcome to IDC Group 30th Anniversary!
      </h1><br/>
      <Image src={img} borderRadius="full" boxSize="180px"  className="imageidc"/>  
      
      <div
        style={{
          
          
          
        }}
      >
        
        <Box className = 'infocustomer' align="left" top="20%">
          <h2 className="mobilefont">{user?.stt},{user?.name}</h2>
          <h2 className="mobilefont">{user?.address}</h2>
          <h2 className="mobilefont">{user?.phone}</h2>
          <h2 className="mobilefont">{user?.email}</h2>
          
        </Box>
      </div>
      
    </Container>
  );
  const MobileCkecked = () => (
    <Container h="100%" align="center"  pb = {70}>
      <p className="checked" />
      <br />
      <br />
      <Box>
        <Text
          style={{
            top: "50%",
            color: "#da251e",
            fontSize: "6vw",
            fontWeight: "bold",
          }}
        >
          You've been checked in!
        </Text>
      </Box>
      <Box
        style={{
          color: "#da251e",
          fontSize: "5.5vw",
          top: "50%",
          fontWeight: "bold",
        }}
      >
        Enjoy The Show.
      </Box>
    </Container>
  );
  //----------------------------------------------------------------

  return (
    <div >
      <BrowserView>
        <Stack h="100vw">
          <Grid h="100%" templateColumns="repeat(10, 1fr)">
            <GridItem colSpan={7} h="100%" bg="#e74c3c">
              {user?.is_check_in == 1 ? <Welcome /> : <ButtonCheckIn />}
            </GridItem>
            <GridItem colSpan={3} h="100%" bg="white">
              <Info />
            </GridItem>
          </Grid>
        </Stack>
      </BrowserView>
      {/* /////////////////////////////////////////// */}
      <MobileView  >
        <Box  backgroundImage={bg} backgroundRepeat="no-repeat">
          <Box  padding={30}>
            <MoblieInfoUser />
          </Box>
          <Box>           
            {user?.is_check_in ? <MobileCkecked /> : <MobileButtonCheckIN />}
          </Box>
        </Box>
      </MobileView>
    </div>
  );
};

export default Home;
