import React from 'react';
import TemplateLogin from '../templates/login';

const FrameRegister = ({ nextAction }) => { 
  return (
    <TemplateLogin 
      title={'Registre-se'} 
      buttonTitle={'Cadastrar'} 
      redirectTitle={'Já possui uma conta? Faça login'}
      redirectStage={'login'}
    /> 
  );
}

export default FrameRegister
