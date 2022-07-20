import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

import api from '../../services/api';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { TCar } from '../../dtos/CarDTO';
import { LoadAnimation } from '../../components/LoadAnimation';

export function Home() {
  const [cars, setCars] = useState<TCar[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleCarDetails = (car: TCar) => {
    navigation.navigate('CarDetails', { car });
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get('/cars');

        setCars(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
