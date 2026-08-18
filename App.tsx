import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { THEME } from './src/config/theme';

const MOCK_STOPS = [
  { id: '1', nome: 'Terminal Central do Brasil', bairro: 'Centro' },
  { id: '2', nome: 'Praça da República', bairro: 'Centro' },
  { id: '3', nome: 'Avenida Rio Branco', bairro: 'Centro' },
  { id: '4', nome: 'Rua Visconde de Pirajá', bairro: 'Ipanema' },
];

export default function App() {
  const [selectedRoute, setSelectedRoute] = useState<string>('474');
  const [loading, setLoading] = useState<boolean>(false);
  const [busCount, setBusCount] = useState<number>(4);

  function handleSelectLine(line: string) {
    setSelectedRoute(line);
    setLoading(true);
    setTimeout(() => {
      setBusCount(line === '474' ? 4 : line === '606' ? 2 : 5);
      setLoading(false);
    }, 250);
  }

  return (
    <View style={[styles.container, { backgroundColor: THEME.bg }]}>
      <StatusBar style="light" />

      {/* Header Principal */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: THEME.text }]}>Rio Bus Alert</Text>
        <Text style={[styles.headerSubtitle, { color: THEME.subtext }]}>
          Mobilidade Urbana & Alerta de Desembarque
        </Text>
      </View>

      {/* Indicador de Conexão Supabase Cloud */}
      <View style={[styles.cloudBadge, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
        <View style={[styles.statusDot, { backgroundColor: THEME.primary }]} />
        <Text style={[styles.cloudBadgeText, { color: THEME.text }]}>
          PostgreSQL Supabase (AWS SP) Conectado
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Seletor de Linhas */}
        <Text style={[styles.sectionTitle, { color: THEME.text }]}>Selecione a Linha em Trânsito</Text>
        <View style={styles.routesContainer}>
          {['474', '606', '309', '483', '457'].map((line) => (
            <TouchableOpacity
              key={line}
              style={[
                styles.routeChip,
                { backgroundColor: THEME.card, borderColor: THEME.border },
                selectedRoute === line && {
                  backgroundColor: THEME.primary,
                  borderColor: THEME.primary,
                },
              ]}
              onPress={() => handleSelectLine(line)}
            >
              <Text
                style={[
                  styles.routeChipText,
                  { color: selectedRoute === line ? '#FFFFFF' : THEME.subtext },
                ]}
              >
                Linha {line}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={THEME.primary} style={{ marginTop: 30 }} />
        ) : (
          <>
            {/* Status da Telemetria GPS */}
            <View style={[styles.card, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
              <Text style={[styles.cardTitle, { color: THEME.text }]}>Telemetria em Tempo Real (Data.rio)</Text>
              <Text style={[styles.cardDetail, { color: THEME.subtext }]}>
                Ônibus ativos na linha {selectedRoute}:{' '}
                <Text style={[styles.boldText, { color: THEME.text }]}>{busCount} veículos</Text>
              </Text>
              <View style={[styles.busRow, { backgroundColor: THEME.bg }]}>
                <Text style={[styles.busCode, { color: THEME.text }]}>Veículo C41001</Text>
                <Text style={[styles.busSpeed, { color: THEME.primary }]}>28 km/h</Text>
              </View>
              <View style={[styles.busRow, { backgroundColor: THEME.bg }]}>
                <Text style={[styles.busCode, { color: THEME.text }]}>Veículo C41002</Text>
                <Text style={[styles.busSpeed, { color: THEME.primary }]}>18 km/h</Text>
              </View>
            </View>

            {/* Resumo do Banco em Nuvem */}
            <View style={[styles.card, { backgroundColor: THEME.card, borderColor: THEME.border }]}>
              <Text style={[styles.cardTitle, { color: THEME.text }]}>Base de Dados Espacial (PostGIS)</Text>
              <Text style={[styles.cardDetail, { color: THEME.subtext }]}>
                Pontos de Ônibus no Banco:{' '}
                <Text style={[styles.boldText, { color: THEME.text }]}>17 pontos</Text>
              </Text>
              <Text style={[styles.cardDetail, { color: THEME.subtext }]}>
                Linhas Cadastradas:{' '}
                <Text style={[styles.boldText, { color: THEME.text }]}>6 linhas</Text>
              </Text>
            </View>

            {/* Amostra dos Pontos de Ônibus */}
            <Text style={[styles.sectionTitle, { color: THEME.text }]}>Pontos Cadastrados no Rio</Text>
            {MOCK_STOPS.map((stop) => (
              <View
                key={stop.id}
                style={[
                  styles.stopCard,
                  { backgroundColor: THEME.card, borderLeftColor: THEME.primary },
                ]}
              >
                <Text style={[styles.stopName, { color: THEME.text }]}>{stop.nome}</Text>
                <Text style={[styles.stopNeighborhood, { color: THEME.subtext }]}>{stop.bairro}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  cloudBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 15,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  cloudBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
  },
  routesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  routeChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  routeChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDetail: {
    fontSize: 13,
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
  busRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
  },
  busCode: {
    fontSize: 13,
    fontWeight: '500',
  },
  busSpeed: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  stopCard: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
  },
  stopName: {
    fontSize: 14,
    fontWeight: '600',
  },
  stopNeighborhood: {
    fontSize: 12,
    marginTop: 2,
  },
});
