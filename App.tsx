import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { fetchStopsFromCloud, fetchRoutesFromCloud, BusStopCloud, BusRouteCloud } from './src/services/supabaseClient';
import { fetchLiveBusPositions } from './src/services/datarioApi';
import { BusPosition } from './src/domain/geoUtils';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [stops, setStops] = useState<BusStopCloud[]>([]);
  const [routes, setRoutes] = useState<BusRouteCloud[]>([]);
  const [liveBuses, setLiveBuses] = useState<BusPosition[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string>('474');

  useEffect(() => {
    loadCloudData();
  }, []);

  async function loadCloudData() {
    setLoading(true);
    try {
      const [cloudStops, cloudRoutes, buses] = await Promise.all([
        fetchStopsFromCloud(),
        fetchRoutesFromCloud(),
        fetchLiveBusPositions(selectedRoute),
      ]);

      setStops(cloudStops);
      setRoutes(cloudRoutes);
      setLiveBuses(buses);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleFilterLine(lineNumber: string) {
    setSelectedRoute(lineNumber);
    setLoading(true);
    const buses = await fetchLiveBusPositions(lineNumber);
    setLiveBuses(buses);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header Principal */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rio Bus Alert</Text>
        <Text style={styles.headerSubtitle}>Mobilidade Urbana & Alerta de Desembarque</Text>
      </View>

      {/* Indicador de Conexão Supabase Cloud */}
      <View style={styles.cloudBadge}>
        <View style={styles.statusDot} />
        <Text style={styles.cloudBadgeText}>PostgreSQL Supabase (AWS SP) Conectado</Text>
      </View>

      {/* Conteúdo Principal */}
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#3B82F6" style={{ marginTop: 40 }} />
        ) : (
          <>
            {/* Seletor de Linhas */}
            <Text style={styles.sectionTitle}>Selecione a Linha em Trânsito</Text>
            <View style={styles.routesContainer}>
              {['474', '606', '309', '483', '457'].map((line) => (
                <TouchableOpacity
                  key={line}
                  style={[
                    styles.routeChip,
                    selectedRoute === line && styles.routeChipActive,
                  ]}
                  onPress={() => handleFilterLine(line)}
                >
                  <Text
                    style={[
                      styles.routeChipText,
                      selectedRoute === line && styles.routeChipTextActive,
                    ]}
                  >
                    Linha {line}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Status da Telemetria GPS */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Telemetria em Tempo Real (Data.rio)</Text>
              <Text style={styles.cardDetail}>
                Ônibus ativos na linha {selectedRoute}: <Text style={styles.boldText}>{liveBuses.length} veículos</Text>
              </Text>
              {liveBuses.slice(0, 3).map((bus, idx) => (
                <View key={idx} style={styles.busRow}>
                  <Text style={styles.busCode}>Veículo {bus.ordem}</Text>
                  <Text style={styles.busSpeed}>{bus.velocidade} km/h</Text>
                </View>
              ))}
            </View>

            {/* Resumo do Banco em Nuvem */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Base de Dados Espacial (PostGIS)</Text>
              <Text style={styles.cardDetail}>
                Pontos de Ônibus no Banco: <Text style={styles.boldText}>{stops.length} pontos</Text>
              </Text>
              <Text style={styles.cardDetail}>
                Linhas Cadastradas: <Text style={styles.boldText}>{routes.length} linhas</Text>
              </Text>
            </View>

            {/* Amostra dos Pontos de Ônibus */}
            <Text style={styles.sectionTitle}>Pontos Cadastrados no Rio</Text>
            {stops.slice(0, 4).map((stop) => (
              <View key={stop.id} style={styles.stopCard}>
                <Text style={styles.stopName}>{stop.nome}</Text>
                <Text style={styles.stopNeighborhood}>{stop.bairro}</Text>
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
    backgroundColor: '#0F172A',
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 2,
  },
  cloudBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 15,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  cloudBadgeText: {
    fontSize: 12,
    color: '#CBD5E1',
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
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
    backgroundColor: '#1E293B',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  routeChipActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  routeChipText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  routeChipTextActive: {
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  cardDetail: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 4,
  },
  boldText: {
    color: '#F8FAFC',
    fontWeight: 'bold',
  },
  busRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
  },
  busCode: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '500',
  },
  busSpeed: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: 'bold',
  },
  stopCard: {
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  stopName: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
  },
  stopNeighborhood: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
});
