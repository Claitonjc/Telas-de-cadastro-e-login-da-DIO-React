import { MdEmail, MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Column, Container, CriarText, EsqueciText, Row, SubtitleLogin, Title, TitleLogin, Wrapper, Formulario } from './styles';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

const schema = yup.object({
    email: yup.string().email('Email não é valido').required('Campo obrigatório'),
    password: yup.string().min(3, 'No minimo 3 caracteres').required('Campo obrigatório'),
}).required();


const Login = () => {

    const navigate = useNavigate();

    const handleClickCreate = () => {
        navigate('/Cadastro')
    }

    const {control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = async formData => {
        try {
            const { data } = await api.get(`users?email=${formData.email}&senha=${formData.password}`);
            if(data.length === 1) {
                navigate('/Feed')
            } else {
                alert('Email ou senha inválido')
            }
        } catch {
            alert('Houve um erro, tente novamente.')
        }
    };

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>
                    A plataforma para você aprender com experts, dominar as principais tecnologias 
                    e entrar mais rápido nas empresas mais desejadas.    
                </Title>   
            </Column>
            <Column>
                <Wrapper>
                    <TitleLogin>Faça seu cadastro</TitleLogin>
                    <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
                </Wrapper>
                <Formulario onSubmit={handleSubmit(onSubmit)}>
                    <Input name="email" errorMessage={errors?.email?.message} control={control} placeholder="E-mail" leftIcon={<MdEmail />}/>
                    <Input name="password" errorMessage={errors?.password?.message} control={control} placeholder="Senha" type="password" leftIcon={<MdLock />}/>
                    <Button title="Entrar" variant="secondary" type="submit"></Button>
                </Formulario>
                <Row>
                    <EsqueciText>Esqueci minha senha</EsqueciText>
                    <CriarText onClick={handleClickCreate}>Criar conta</CriarText>
                </Row>
            </Column>
        </Container>
        </>
    )
}

export { Login }