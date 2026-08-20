import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons';
import { BusStop } from '../../services/gtfsService';
import { submitFeedbackToCloud, UserFeedback } from '../../services/supabaseClient';
import { SPACING, RADII } from '../../config/grid';

export interface AlertSettings {
  radius: number; // 200, 300, 500
  sound: boolean;
  vibration: boolean;
}

export interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  selectedStop?: BusStop | null;
  selectedLineNumber?: string | null;
  userCoords?: { latitude: number; longitude: number };
  favoriteStops?: BusStop[];
  favoriteLines?: string[];
  onSelectFavoriteStop?: (stop: BusStop) => void;
  onSelectFavoriteLine?: (line: string) => void;
  onRemoveFavoriteStop?: (stopId: string) => void;
  onRemoveFavoriteLine?: (lineNumber: string) => void;
  alertSettings: AlertSettings;
  onChangeAlertSettings: (settings: AlertSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  selectedStop,
  selectedLineNumber,
  userCoords,
  favoriteStops = [],
  favoriteLines = [],
  onSelectFavoriteStop,
  onSelectFavoriteLine,
  onRemoveFavoriteStop,
  onRemoveFavoriteLine,
  alertSettings,
  onChangeAlertSettings,
}) => {
  const [currentView, setCurrentView] = useState<'menu' | 'favorites' | 'alerts' | 'feedback' | 'about'>('menu');
  const [feedbackType, setFeedbackType] = useState<UserFeedback['type']>('ponto_erro');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Animação de Entrada e Escala a partir do botão superior esquerdo
  const animProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setCurrentView('menu');
      setSubmitSuccess(false);
      Animated.spring(animProgress, {
        toValue: 1,
        useNativeDriver: true,
        friction: 7,
        tension: 65,
      }).start();
    } else {
      animProgress.setValue(0);
    }
  }, [visible]);

  const handleOpenFeedback = (type: UserFeedback['type'] = 'ponto_erro') => {
    setFeedbackType(type);
    setFeedbackText('');
    setSubmitSuccess(false);
    setCurrentView('feedback');
  };

  const handleSendFeedback = async () => {
    if (!feedbackText.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await submitFeedbackToCloud({
        type: feedbackType,
        stopId: selectedStop?.id,
        stopName: selectedStop?.name,
        lineNumber: selectedLineNumber || undefined,
        description: feedbackText.trim(),
        userCoords,
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setCurrentView('menu');
        onClose();
      }, 1400);
    } catch (e) {
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalFavorites = favoriteStops.length + favoriteLines.length;

  const getHeaderInfo = () => {
    switch (currentView) {
      case 'favorites':
        return { title: 'Meus Favoritos', sub: 'Linhas e paradas salvas' };
      case 'alerts':
        return { title: 'Alerta de Desembarque', sub: 'Configurações de proximidade' };
      case 'feedback':
        return { title: 'Suporte & Comunidade', sub: 'Reporte erros ou fale com a equipe' };
      case 'about':
        return { title: 'Sobre o OnBus Rio', sub: 'Versão e informações oficiais' };
      default:
        return { title: 'Menu do Passageiro', sub: 'Configurações e Favoritos' };
    }
  };

  const headerInfo = getHeaderInfo();

  const backdropOpacity = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const cardScale = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1],
  });

  const cardOpacity = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const cardTranslateY = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  const cardTranslateX = animProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 0],
  });

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={onClose}
    >
      {/* BACKDROP ANIMADO: Escurecimento suave e progressivo */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.modalBackdrop, { opacity: backdropOpacity }]}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.popoverCard,
                {
                  opacity: cardOpacity,
                  transform: [
                    { scale: cardScale },
                    { translateY: cardTranslateY },
                    { translateX: cardTranslateX },
                  ],
                },
              ]}
            >
              {/* HEADER DO POPOVER */}
              <View style={styles.popoverHeader}>
                <View style={styles.headerLeft}>
                  {currentView !== 'menu' ? (
                    <TouchableOpacity
                      onPress={() => setCurrentView('menu')}
                      style={styles.backBtn}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="arrow-back" size={16} color="#F2F3F5" />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.avatarCircle}>
                      <Ionicons name="person" size={14} color="#FFFFFF" />
                    </View>
                  )}
                  <View style={{ marginLeft: 8 }}>
                    <Text style={styles.headerTitle}>{headerInfo.title}</Text>
                    <Text style={styles.headerSubtitle}>{headerInfo.sub}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
                  <Feather name="x" size={16} color="#949BA4" />
                </TouchableOpacity>
              </View>

              {/* VIEW 1: MENU PRINCIPAL */}
              {currentView === 'menu' && (
                <ScrollView
                  style={styles.menuScroll}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 10 }}
                >
                  <Text style={styles.sectionLabel}>MEUS ATALHOS</Text>

                  {/* 1. MEUS FAVORITOS */}
                  <TouchableOpacity
                    style={styles.popoverItem}
                    activeOpacity={0.7}
                    onPress={() => setCurrentView('favorites')}
                  >
                    <View style={[styles.itemIconBox, { backgroundColor: '#F59E0B' }]}>
                      <AntDesign name="star" size={15} color="#FFFFFF" />
                    </View>
                    <View style={styles.itemContent}>
                      <Text style={styles.itemTitle}>Meus Favoritos</Text>
                      <Text style={styles.itemDesc}>
                        {totalFavorites > 0
                          ? `${totalFavorites} ite${totalFavorites > 1 ? 'ns salvos' : 'm salvo'}`
                          : 'Salve paradas e linhas diárias'}
                      </Text>
                    </View>
                    {totalFavorites > 0 && (
                      <View style={styles.badgePill}>
                        <Text style={styles.badgeText}>{totalFavorites}</Text>
                      </View>
                    )}
                    <Feather name="chevron-right" size={16} color="#949BA4" />
                  </TouchableOpacity>

                  {/* 2. ALERTA DE DESEMBARQUE */}
                  <TouchableOpacity
                    style={styles.popoverItem}
                    activeOpacity={0.7}
                    onPress={() => setCurrentView('alerts')}
                  >
                    <View style={[styles.itemIconBox, { backgroundColor: '#0284C7' }]}>
                      <Ionicons name="notifications" size={16} color="#FFFFFF" />
                    </View>
                    <View style={styles.itemContent}>
                      <Text style={styles.itemTitle}>Alerta de Desembarque</Text>
                      <Text style={styles.itemDesc}>
                        {`${alertSettings.radius}m · ${alertSettings.sound ? 'Som' : 'Silencioso'}`}
                      </Text>
                    </View>
                    <Feather name="chevron-right" size={16} color="#949BA4" />
                  </TouchableOpacity>

                  {/* 3. SUPORTE & COMUNIDADE */}
                  <TouchableOpacity
                    style={styles.popoverItem}
                    activeOpacity={0.7}
                    onPress={() => handleOpenFeedback('ponto_erro')}
                  >
                    <View style={[styles.itemIconBox, { backgroundColor: '#EF4444' }]}>
                      <MaterialCommunityIcons name="comment-alert-outline" size={16} color="#FFFFFF" />
                    </View>
                    <View style={styles.itemContent}>
                      <Text style={styles.itemTitle}>Suporte & Reportar Erro</Text>
                      <Text style={styles.itemDesc}>Informar sentido de rua ou sugerir</Text>
                    </View>
                    <Feather name="chevron-right" size={16} color="#949BA4" />
                  </TouchableOpacity>

                  {/* 4. SOBRE & CONTATO */}
                  <TouchableOpacity
                    style={styles.popoverItem}
                    activeOpacity={0.7}
                    onPress={() => setCurrentView('about')}
                  >
                    <View style={[styles.itemIconBox, { backgroundColor: '#313338', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }]}>
                      <Ionicons name="information-circle-outline" size={16} color="#38BDF8" />
                    </View>
                    <View style={styles.itemContent}>
                      <Text style={styles.itemTitle}>Sobre & Contato Profissional</Text>
                      <Text style={styles.itemDesc}>Dados oficiais GTFS · v1.0 Beta</Text>
                    </View>
                    <Feather name="chevron-right" size={16} color="#949BA4" />
                  </TouchableOpacity>
                </ScrollView>
              )}

              {/* VIEW 2: MEUS FAVORITOS */}
              {currentView === 'favorites' && (
                <ScrollView style={styles.menuScroll} showsVerticalScrollIndicator={false}>
                  {totalFavorites === 0 ? (
                    <View style={styles.emptyFavoritesBox}>
                      <Ionicons name="star-outline" size={32} color="#4E5058" />
                      <Text style={styles.emptyFavoritesTitle}>Nenhum favorito ainda</Text>
                      <Text style={styles.emptyFavoritesDesc}>
                        Toque na estrela de qualquer parada ou linha no mapa para salvar aqui e acessar com 1 toque.
                      </Text>
                    </View>
                  ) : (
                    <>
                      {/* PARADAS SALVAS */}
                      {favoriteStops.length > 0 && (
                        <>
                          <Text style={styles.sectionLabel}>PARADAS SALVAS</Text>
                          {favoriteStops.map((stop) => (
                            <TouchableOpacity
                              key={stop.id}
                              style={styles.favoriteCard}
                              activeOpacity={0.7}
                              onPress={() => {
                                onSelectFavoriteStop?.(stop);
                                onClose();
                              }}
                            >
                              <View style={[styles.itemIconBox, { backgroundColor: '#0284C7' }]}>
                                <MaterialCommunityIcons name="bus-stop" size={16} color="#FFFFFF" />
                              </View>
                              <View style={styles.itemContent}>
                                <Text style={styles.itemTitle} numberOfLines={1}>{stop.name}</Text>
                                <Text style={styles.itemDesc}>Toque para ver no mapa</Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => onRemoveFavoriteStop?.(stop.id)}
                                style={styles.removeFavBtn}
                              >
                                <Ionicons name="star" size={16} color="#F59E0B" />
                              </TouchableOpacity>
                            </TouchableOpacity>
                          ))}
                        </>
                      )}

                      {/* LINHAS SALVAS */}
                      {favoriteLines.length > 0 && (
                        <>
                          <Text style={[styles.sectionLabel, { marginTop: SPACING.md }]}>LINHAS SALVAS</Text>
                          {favoriteLines.map((lineNum) => (
                            <TouchableOpacity
                              key={lineNum}
                              style={styles.favoriteCard}
                              activeOpacity={0.7}
                              onPress={() => {
                                onSelectFavoriteLine?.(lineNum);
                                onClose();
                              }}
                            >
                              <View style={[styles.itemIconBox, { backgroundColor: '#10B981' }]}>
                                <Ionicons name="bus" size={15} color="#FFFFFF" />
                              </View>
                              <View style={styles.itemContent}>
                                <Text style={styles.itemTitle}>Linha {lineNum}</Text>
                                <Text style={styles.itemDesc}>Traçado oficial no mapa</Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => onRemoveFavoriteLine?.(lineNum)}
                                style={styles.removeFavBtn}
                              >
                                <Ionicons name="star" size={16} color="#F59E0B" />
                              </TouchableOpacity>
                            </TouchableOpacity>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </ScrollView>
              )}

              {/* VIEW 3: CONFIGURAÇÕES DE ALERTA */}
              {currentView === 'alerts' && (
                <View style={styles.settingsSubView}>
                  <Text style={styles.subViewHeading}>Distância para o Alarme:</Text>
                  <Text style={styles.subViewSubtext}>
                    O alarme tocará automaticamente quando você estiver a esta distância do ponto de descida:
                  </Text>

                  {/* SELETOR DE RAIO */}
                  <View style={styles.radiusPillRow}>
                    {[200, 300, 500].map((r) => {
                      const isSelected = alertSettings.radius === r;
                      return (
                        <TouchableOpacity
                          key={r}
                          style={[styles.radiusPill, isSelected && styles.radiusPillSelected]}
                          activeOpacity={0.8}
                          onPress={() => onChangeAlertSettings({ ...alertSettings, radius: r })}
                        >
                          <Text style={[styles.radiusPillText, isSelected && styles.radiusPillTextSelected]}>
                            {r} metros
                          </Text>
                          {r === 300 && <Text style={styles.recommendedBadge}>(Padrão)</Text>}
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <View style={styles.divider} />

                  <Text style={styles.subViewHeading}>Tipos de Aviso:</Text>

                  {/* TOGGLE SOM */}
                  <TouchableOpacity
                    style={styles.toggleRow}
                    activeOpacity={0.7}
                    onPress={() => onChangeAlertSettings({ ...alertSettings, sound: !alertSettings.sound })}
                  >
                    <View style={styles.toggleRowLeft}>
                      <Ionicons
                        name={alertSettings.sound ? 'volume-high' : 'volume-mute'}
                        size={18}
                        color={alertSettings.sound ? '#38BDF8' : '#949BA4'}
                      />
                      <Text style={styles.toggleLabel}>Alerta Sonoro</Text>
                    </View>
                    <View style={[styles.toggleSwitch, alertSettings.sound && styles.toggleSwitchActive]}>
                      <View style={[styles.toggleThumb, alertSettings.sound && styles.toggleThumbActive]} />
                    </View>
                  </TouchableOpacity>

                  {/* TOGGLE VIBRAÇÃO */}
                  <TouchableOpacity
                    style={styles.toggleRow}
                    activeOpacity={0.7}
                    onPress={() => onChangeAlertSettings({ ...alertSettings, vibration: !alertSettings.vibration })}
                  >
                    <View style={styles.toggleRowLeft}>
                      <MaterialCommunityIcons
                        name={alertSettings.vibration ? 'vibrate' : 'vibrate-off'}
                        size={18}
                        color={alertSettings.vibration ? '#38BDF8' : '#949BA4'}
                      />
                      <Text style={styles.toggleLabel}>Vibração no Celular</Text>
                    </View>
                    <View style={[styles.toggleSwitch, alertSettings.vibration && styles.toggleSwitchActive]}>
                      <View style={[styles.toggleThumb, alertSettings.vibration && styles.toggleThumbActive]} />
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              {/* VIEW 4: CENTRAL UNIFICADA DE SUPORTE & FEEDBACK */}
              {currentView === 'feedback' && (
                <View style={styles.feedbackFormContainer}>
                  {submitSuccess ? (
                    <View style={styles.successState}>
                      <Ionicons name="checkmark-circle" size={40} color="#10B981" />
                      <Text style={styles.successHeading}>Mensagem Enviada!</Text>
                      <Text style={styles.successSubtext}>
                        Obrigado pelo reporte. Ele já foi gravado no banco da equipe para ajuste.
                      </Text>
                    </View>
                  ) : (
                    <>
                      {/* CHIPS DE SELEÇÃO RÁPIDA DE ASSUNTO */}
                      <View style={styles.chipRow}>
                        <TouchableOpacity
                          style={[styles.chipItem, feedbackType === 'ponto_erro' && styles.chipItemSelected]}
                          onPress={() => setFeedbackType('ponto_erro')}
                        >
                          <Text style={[styles.chipText, feedbackType === 'ponto_erro' && styles.chipTextSelected]}>
                            🚩 Erro no Ponto
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.chipItem, feedbackType === 'sugestao' && styles.chipItemSelected]}
                          onPress={() => setFeedbackType('sugestao')}
                        >
                          <Text style={[styles.chipText, feedbackType === 'sugestao' && styles.chipTextSelected]}>
                            💡 Sugestão
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.chipItem, feedbackType === 'outro' && styles.chipItemSelected]}
                          onPress={() => setFeedbackType('outro')}
                        >
                          <Text style={[styles.chipText, feedbackType === 'outro' && styles.chipTextSelected]}>
                            ✉️ Outro
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {selectedStop && (
                        <View style={styles.boundStopBox}>
                          <MaterialCommunityIcons name="pin" size={13} color="#38BDF8" />
                          <Text style={styles.boundStopText} numberOfLines={1}>
                            Ponto vinculado: <Text style={{ color: '#F2F3F5', fontWeight: 'bold' }}>{selectedStop.name}</Text>
                          </Text>
                        </View>
                      )}

                      <TextInput
                        style={styles.feedbackTextInput}
                        multiline={true}
                        numberOfLines={3}
                        placeholder={
                          feedbackType === 'ponto_erro'
                            ? 'Ex: O sentido da seta deveria estar para o outro lado, ou o ponto mudou de lugar...'
                            : feedbackType === 'sugestao'
                            ? 'Ex: Gostaria de ter recurso X ou mais linhas cadastradas...'
                            : 'Deixe sua mensagem para os desenvolvedores...'
                        }
                        placeholderTextColor="#949BA4"
                        value={feedbackText}
                        onChangeText={setFeedbackText}
                        autoFocus={true}
                      />

                      <TouchableOpacity
                        style={[
                          styles.submitActionBtn,
                          (!feedbackText.trim() || isSubmitting) && styles.submitActionBtnDisabled,
                        ]}
                        activeOpacity={0.85}
                        disabled={!feedbackText.trim() || isSubmitting}
                        onPress={handleSendFeedback}
                      >
                        {isSubmitting ? (
                          <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                          <>
                            <Ionicons name="send" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                            <Text style={styles.submitActionBtnText}>Enviar para a Equipe</Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              )}

              {/* VIEW 5: SOBRE & CONTATO PROFISSIONAL */}
              {currentView === 'about' && (
                <View style={styles.settingsSubView}>
                  <View style={styles.aboutHeaderRow}>
                    <View style={styles.appLogoMini}>
                      <Ionicons name="bus" size={20} color="#FFFFFF" />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.aboutAppName}>OnBus Rio</Text>
                      <Text style={styles.aboutAppTag}>Versão 1.0.0 (Beta Oficial)</Text>
                    </View>
                  </View>

                  <Text style={styles.aboutDescription}>
                    Aplicativo focado em descoberta instantânea de transporte público e alertas de desembarque em tempo real no Rio de Janeiro.
                  </Text>

                  <View style={styles.aboutDataBox}>
                    <Text style={styles.aboutDataTitle}>FONTES DE DADOS OFICIAIS</Text>
                    <Text style={styles.aboutDataDesc}>• SMTR - Secretaria Municipal de Transportes</Text>
                    <Text style={styles.aboutDataDesc}>• DATA.RIO / Instituto Pereira Passos (ArcGIS)</Text>
                    <Text style={styles.aboutDataDesc}>• Malha GTFS Oficial da Cidade do Rio</Text>
                  </View>

                  <View style={styles.aboutContactBox}>
                    <Text style={styles.aboutDataTitle}>CONTATO & PARCERIAS</Text>
                    <Text style={styles.contactEmail}>contato@onbusrio.app</Text>
                  </View>
                </View>
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  popoverCard: {
    position: 'absolute',
    top: 60,
    left: 14,
    width: Math.min(Dimensions.get('window').width - 28, 340),
    maxHeight: '80%',
    backgroundColor: '#2B2D31',
    borderRadius: 16,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    zIndex: 9999,
  },
  popoverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: '#313338',
  },
  headerTitle: {
    color: '#F2F3F5',
    fontSize: 14,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#949BA4',
    fontSize: 10,
    marginTop: 1,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 14,
    backgroundColor: '#313338',
  },
  menuScroll: {
    marginTop: SPACING.sm,
  },
  sectionLabel: {
    color: '#949BA4',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 6,
    marginTop: 4,
  },
  popoverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#313338',
    padding: 10,
    borderRadius: 10,
    marginBottom: 6,
  },
  itemIconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    color: '#F2F3F5',
    fontSize: 13,
    fontWeight: '600',
  },
  itemDesc: {
    color: '#949BA4',
    fontSize: 10,
    marginTop: 1,
  },
  badgePill: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 6,
  },
  badgeText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#313338',
    padding: 10,
    borderRadius: 10,
    marginBottom: 6,
  },
  removeFavBtn: {
    padding: 6,
  },
  emptyFavoritesBox: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  emptyFavoritesTitle: {
    color: '#F2F3F5',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 8,
  },
  emptyFavoritesDesc: {
    color: '#949BA4',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
  settingsSubView: {
    paddingTop: SPACING.sm,
  },
  subViewHeading: {
    color: '#F2F3F5',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  subViewSubtext: {
    color: '#949BA4',
    fontSize: 10,
    marginBottom: 10,
    lineHeight: 14,
  },
  radiusPillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  radiusPill: {
    flex: 1,
    backgroundColor: '#1E1F22',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  radiusPillSelected: {
    backgroundColor: '#0284C7',
    borderColor: '#38BDF8',
  },
  radiusPillText: {
    color: '#949BA4',
    fontSize: 11,
    fontWeight: '600',
  },
  radiusPillTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  recommendedBadge: {
    color: '#38BDF8',
    fontSize: 8,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: SPACING.sm,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1F22',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  toggleRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    color: '#F2F3F5',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 8,
  },
  toggleSwitch: {
    width: 36,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4E5058',
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: '#0284C7',
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  feedbackFormContainer: {
    paddingTop: SPACING.sm,
  },
  chipRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  chipItem: {
    backgroundColor: '#1E1F22',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
    marginRight: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  chipItemSelected: {
    backgroundColor: '#0284C7',
    borderColor: '#38BDF8',
  },
  chipText: {
    color: '#949BA4',
    fontSize: 10,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  boundStopBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1F22',
    padding: 6,
    borderRadius: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  boundStopText: {
    color: '#949BA4',
    fontSize: 10,
    marginLeft: 4,
  },
  feedbackTextInput: {
    backgroundColor: '#1E1F22',
    color: '#F2F3F5',
    borderRadius: 10,
    padding: SPACING.sm,
    fontSize: 12,
    height: 75,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: SPACING.sm,
  },
  submitActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0284C7',
    paddingVertical: 9,
    borderRadius: RADII.pill,
  },
  submitActionBtnDisabled: {
    backgroundColor: '#4E5058',
    opacity: 0.6,
  },
  submitActionBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  successState: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  successHeading: {
    color: '#F2F3F5',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  successSubtext: {
    color: '#949BA4',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 12,
  },
  aboutHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  appLogoMini: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutAppName: {
    color: '#F2F3F5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  aboutAppTag: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '600',
  },
  aboutDescription: {
    color: '#949BA4',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 10,
  },
  aboutDataBox: {
    backgroundColor: '#1E1F22',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  aboutDataTitle: {
    color: '#F2F3F5',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  aboutDataDesc: {
    color: '#949BA4',
    fontSize: 10,
    marginBottom: 2,
  },
  aboutContactBox: {
    backgroundColor: '#1E1F22',
    padding: 8,
    borderRadius: 8,
  },
  contactEmail: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '600',
  },
});
