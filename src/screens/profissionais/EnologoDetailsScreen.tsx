import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import LabeledInput from "../../components/LabeledInput";
import PreferenceSection from "../../components/PreferenceSection";
import {ConfirmButton} from "../../components/ConfirmButton";
import { CertificacaoVinho } from "../../constants/CertificacoesVinho";
import { EnologoRepository } from "../../repositories/EnologoRepository";
import CancelButton from "../../components/CancelButtons";
import { RootStackParamList } from "../../types/navigation";
import { ProfissionaisRepository } from "../../repositories/ProfessionalsRepository";
import { Profissional } from "../../entities/Professional";
import { Enologo } from "../../entities/Enologo";
import { RepositoryException } from "../../repositories/RepositoryException";

// Define um tipo para os dados do formulário para simplificar o estado
type EnologoFormData = {
  nome: string;
  email: string;
  telefone: string;
  formacaoAcademica: string;
  certificacoes: CertificacaoVinho[];
};
type ProfessionalDetailsRouteProp = RouteProp<RootStackParamList, typeof ROUTE_NAMES.ENOLOGO_DETAILS>;

const EnologoDetailsScreen: React.FC = () => {
  const route = useRoute<ProfessionalDetailsRouteProp>();
  const navigation = useNavigation();
  const enologoId = route.params.professionalId;
  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [enologo, setEnologo] = useState<Enologo | null>(null);
    // UseMemo para instanciar repositórios apenas uma vez
  const enologoRepository = useMemo(() => new EnologoRepository(), []);
  const profissionalRepository = useMemo(() => new ProfissionaisRepository(), []);

  // Estado unificado para os dados do formulário
  const [formData, setFormData] = useState<EnologoFormData>({
    nome: "",
    email: "",
    telefone: "",
    formacaoAcademica: "",
    certificacoes: [],
  });
  useEffect(() => {
    if (enologoId !== "new") {
      const fetchEnologo = async () => {
        try {
        const enologo = await enologoId.find(enologoId)
        setEnologo(enologo);
        const profissional = await profissionalRepository.find(enologo.professionalId)
        setProfissional(profissional)
        setProfissional(profissional);
        } catch(error) {
          if(error instanceof RepositoryException) {
            Alert.alert(error.message)
          } else {
            Alert.alert("Um erro desconhecido ocorreu, por favor tente novamente.")
          }
        }
      }
      fetchEnologo();
    }
  }, [enologoId]);

  const handleSave = async () => {
    if (!profissional?.nome || !profissional?.email || !profissional?.telefone || !enologo?.formacaoAcademica) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }
    try {
      if (enologoId === "new") {
        const profissionalId = await profissionalRepository.create(new Profissional(profissional.nome, profissional.email, profissional.telefone, profissional.certificacoes as CertificacaoVinho[]));
        await enologoRepository.create(new Enologo(profissionalId, enologo.formacaoAcademica));
        Alert.alert("Enologo adicionado");
      } else {
        const newEnologo = await enologoRepository.update(enologoId, enologo)
        await profissionalRepository.update(enologo.profissionalId, profissional)
        Alert.alert("Enologo atualizado");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o profissional.");
      console.error("Erro ao salvar profissional:", error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };
    // Função centralizada para atualizar o estado do formulário de forma imutável
  const handleInputChange = (field: keyof EnologoFormData, value: string | CertificacaoVinho[]) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

    return (
      <View style={localStyles.screenContainer}>
    <ScrollView contentContainerStyle={localStyles.scrollContainer}>
      <LabeledInput
        title="Nome do Enólogo"
        placeholder="Digite o nome"
        value={formData.nome}
        onChange={(text) => handleInputChange('nome', text)}
        containerStyle={localStyles.inputContainer}
      />
      <LabeledInput
        title="Email"
        placeholder="Digite o email"
        value={formData.email}
        onChange={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
        containerStyle={localStyles.inputContainer}
      />
      <LabeledInput
        title="Telefone"
        placeholder="Digite o telefone"
        value={formData.telefone}
        onChange={(text) => handleInputChange('telefone', text)}
        keyboardType="phone-pad"
        containerStyle={localStyles.inputContainer}
      />
      <LabeledInput
        title="Formação Acadêmica"
        placeholder="Digite a formação acadêmica"
        value={formData.formacaoAcademica}
        onChange={(text) => handleInputChange('formacaoAcademica', text)}
        containerStyle={localStyles.inputContainer}
      />
      <PreferenceSection
        title="Certificações"
        subtitle="Selecione as certificações do enólogo"
        options={Object.values(CertificacaoVinho)}
        selected={formData.certificacoes}
        onChange={(value) => handleInputChange('certificacoes', (Array.isArray(value) ? value : [value]) as CertificacaoVinho[])}
        multiSelect={true}
        styles={localStyles.preferencesContainer}
      />
      <View style={localStyles.buttonContainer}>
        <ConfirmButton title="Salvar" onPress={handleSave} styles={localStyles.confirmButton} />
        <CancelButton title="Cancelar" onPress={handleCancel} />
      </View>
    </ScrollView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  confirmButton:{
    width: "100%"
  },
  preferencesContainer: {
    paddingTop: 16,
  },
  inputContainer: {
    padding: 1,
  },
  scrollContainer: {
    paddingStart:14,
    paddingEnd: 14,
    backgroundColor: "#fff",
    paddingTop: 8,
    paddingBottom: 32,
    },
  buttonContainer: {
    flex: 0,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 2
  },
});

export default EnologoDetailsScreen;