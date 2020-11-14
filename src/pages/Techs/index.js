import React, { useState } from 'react';
import { ActivityIndicator, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  List,
  Name,
  SubmitButton,
  Tech,
  ProfileButton,
} from './styles';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState(null);
  const navigation = useNavigation();

  async function handleAddTech() {
    setLoading(true);
    const { data } = await api.post('/techs/', { id: newTech });
    await setTechs([...techs, data]);
    await console.log('DATA-API', techs);
    setLoading(false);
    setNewTech(null);
    Keyboard.dismiss();
  }

  async function handleDeleteTech(id) {
    await api.delete(`/techs/${id}`);
    const filteredTechs = techs.filter((tech) => tech.id !== id);
    setTechs(filteredTechs);
  }

  function navigationToDetails(tech) {
    navigation.navigate('TechDetail', { tech });
  }

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Acidionar tecnologia"
          value={newTech}
          onChangeText={setNewTech}
          returnKeyType="send"
          onSubmitEditing={() => {}}
        />
        <SubmitButton loading={loading} onPress={newTech && handleAddTech}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Icon name="add" size={20} color="#ffffff" />
          )}
        </SubmitButton>
      </Form>
      <List
        data={techs}
        keyExtractor={(tech) => tech.id}
        renderItem={({ item }) => (
          <Tech>
            <Name>{item.id}</Name>
            <ProfileButton
              background="#ffc107"
              onPress={() => navigationToDetails(item)}
            >
              <Icon name="design-services" size={20} color="#ffffff" />
            </ProfileButton>

            <ProfileButton
              background="#ffc107"
              onPress={() => {
                handleDeleteTech(item.id);
              }}
            >
              <Icon name="delete" size={20} color="#ffffff" />
            </ProfileButton>
          </Tech>
        )}
      />
    </Container>
  );
}
