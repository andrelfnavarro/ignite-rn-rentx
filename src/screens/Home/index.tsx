import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

import api from '../../services/api';
import { database } from '../../database';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Car as DBCarModel } from '../../database/model/Car';

export function Home() {
  const [cars, setCars] = useState<DBCarModel[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const handleCarDetails = (car: DBCarModel) => {
    navigation.navigate('CarDetails', { car });
  };

  const offlineSync = async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(
          `/cars/sync/pull?lastPulledVersion=${lastPulledAt ?? 0}`
        );

        const { changes, latestVersion } = data;

        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;

        try {
          await api.post('/users/sync', user);
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  useEffect(() => {
    let isMounted = true;
    const fetchCars = async () => {
      try {
        const carCollection = database.collections.get<DBCarModel>('cars');
        const carsFetched = await carCollection.query().fetch();
        isMounted && setCars(carsFetched);
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected) {
      offlineSync();
    }
  }, [netInfo.isConnected]);

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
