import styled from "styled-components/native";
import MaskInput from "react-native-mask-input";

export const Header = styled.View`
  padding-top: 30px;
`;

export const Body = styled.View`
  margin-top: 118px;
  background-color: white;
  width: 360px;
  padding: 24px;
  border-radius: 12px;
`;

export const TextWrapper = styled.View``;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.semibold};
  font-size: 16px;
`;

export const Description = styled.Text`
  padding-top: 8px;
`;

export const InputWrapper = styled.View`
  margin-top: 40px;
  gap: 10px;
  align-items: center;
`;

export const InputBox = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #94a3b8;
  border-radius: 12px;
  flex-direction: row;
  gap: 10px;
`;

const Input = styled(MaskInput)`
  border-radius: 4px;
  padding: 18.5px 16px;
  flex-grow: 1;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray_100};
`;

export const FromInput = styled(Input)``;

export const ToInput = styled.Text`
  padding: 18.5px 16px;
  flex-grow: 1;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray_100};
`;

export const ConvertButton = styled.TouchableOpacity`
  margin-top: "auto";
  height: 100px;
  align-self: "center";
  background-color: "#cabff5";
  width: "100%";
  align-items: "center";
  justify-content: "center";
`;

export const ConvertText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
`;
