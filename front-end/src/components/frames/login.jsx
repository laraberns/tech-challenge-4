import React from 'react';
import TemplateLogin from '../templates/login';

const FrameLogin = ({ nextAction }) => { 
  return (
    <TemplateLogin 
      title={'Login'} 
      buttonTitle={'Entrar'} 
      redirectTitle={'Não possui uma conta? Cadastre-se'}
      redirectStage={'register'}
    /> 
  );
}

export default FrameLogin;
