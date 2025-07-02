import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import LabeledInput from "../../components/LabeledInput";
import PreferenceSection from "../../components/PreferenceSection";
import {ConfirmButton} from "../../components/ConfirmButton";
import { CertificacaoVinho } from "../../constants/CertificacoesVinho";
import { EnologoRepository } from "../../repositories/EnologoRepository";
import CancelButton from "../../components/CancelButtons";
import { RootStackParamList } from "../../types/navigation";

type ProfessionalDetailsRouteProp = RouteProp<RootStackParamList, typeof ROUTE_NAMES.PROFESSIONAL_DETAILS>;

const ProfessionalDetailsScreen: React.FC = () => {
  const route = useRoute<ProfessionalDetailsRouteProp>();
  const navigation = useNavigation();
  const professionalId = route.params.professionalId;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [academicFormation, setAcademicFormation] = useState("");
  const [certifications, setCertifications] = useState<string[]>([]);

  const enologoRepository = new EnologoRepository();

  useEffect(() => {
    if (professionalId !== "new") {
      // Carregar dados do profissional existente
      enologoRepository.read(professionalId).then((data) => {
        if (data) {
          setName(data.profissional.nome);
          setEmail(data.profissional.email);
          setTelephone(data.profissional.telefone);
          setAcademicFormation(data.formacaoAcademica);
          setCertifications(data.profissional.certificacoes || []);
        } else {
          Alert.alert("Erro", "Profissional não encontrado.");
          navigation.goBack();
        }
      });
    }
  }, [professionalId]);

  const handleSave = async () => {
    if (!name || !email || !telephone || !academicFormation) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      if (professionalId === "new") {
        // Criar novo profissional
        await enologoRepository.create({
          profissional: {
            nome: name,
            email,
            telefone: telephone,
            certificacoes: certifications as CertificacaoVinho[],
          },
          formacaoAcademica: academicFormation,
        });
        Alert.alert("Sucesso", "Profissional adicionado com sucesso.");
      } else {
        // Atualizar profissional existente
        await enologoRepository.update(professionalId, {
          profissional: {
            nome: name,
            email,
            telefone: telephone,
            certificacoes: certifications as CertificacaoVinho[],
          },
          formacaoAcademica: academicFormation,
        });
        Alert.alert("Sucesso", "Profissional atualizado com sucesso.");
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

  return (
       <ScrollView contentContainerStyle={localStyles.screenContainer}>
      <LabeledInput
        title="Nome do Enólogo"
        placeholder="Digite o nome"
        value={name}
        onChange={setName}
        containerStyle={localStyles.inputContainer}
      />
      <LabeledInput
        title="Email"
        placeholder="Digite o email"
        value={email}
        onChange={setEmail}
        containerStyle={localStyles.inputContainer}
      />
      <LabeledInput
        title="Telefone"
        placeholder="Digite o telefone"
        value={telephone}
        onChange={setTelephone}

      />
      <LabeledInput
        title="Formação Acadêmica"
        placeholder="Digite a formação acadêmica"
        value={academicFormation}
        onChange={setAcademicFormation}
      />
      <PreferenceSection
        title="Certificações"
        subtitle="Selecione as certificações do enólogo"
        options={Object.values(CertificacaoVinho)}
        selected={certifications}
        onChange={(value) => setCertifications(Array.isArray(value) ? value : [value])}
        multiSelect={true}
        styles={localStyles.preferencesContainer}
      />
        <ConfirmButton title="Salvar" onPress={handleSave} styles={localStyles.confirmButton}/>
        <CancelButton title="Cancelar" onPress={handleCancel}/>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  confirmButton:{
    width: "100%"
  },
  preferencesContainer: {
    paddingTop: 16,
  },
  inputContainer: {
    padding: 1,
  },
  screenContainer: {
    justifyContent: "flex-start",
    flex: 1,
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

export default ProfessionalDetailsScreen;