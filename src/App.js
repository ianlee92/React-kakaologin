import React, { Component } from 'react';

class App extends Component {
    state = {
        isLogin: false,
    }

    loginWithkakao = () => {
        try{
            return new Promise((resolve, reject) => {
                if(!window.Kakao){
                    reject('Kakao 인스턴스가 존재하지 않습니다.')
                }
                window.Kakao.Auth.login({
                    scope: 'profile, account_email, gender',
                    success: (auth) => {
                        console.log('정상적으로 로그인 되었습니다.', auth)
                        window.Kakao.API.request({
                            url: '/v2/user/me',
                            success: res => {
                                const kakao_account = res.kakao_acount;
                                console.log(kakao_account);
                            }
                        })
                        this.setState({
                            isLogin: true
                        })
                    },
                    fail: (err) => {
                        console.error(err)
                    }
                })
            })
        } catch(err){
            console.error(err)
        }
    }
    logoutWithkakao = () => {
        if(window.Kakao.Auth.getAccessToken()){
            console.log('카카오 인증 액세스 토큰이 존재합니다', window.Kakao.Auth.getAccessToken())
            window.Kakao.Auth.logout(() => {
                console.log('로그아웃 되었습니다', window.Kakao.Auth.getAccessToken());
                this.setState({
                    isLogin: false
                })
            });
        }
    }

    componentDidMount() {
        window.Kakao.init('63458f6f9c843d7aa1b95d9890bb0b69');
        if (window.Kakao.Auth.getAccessToken()){
            console.log('액세스 토큰이 존재합니다. 세션을 유지합니다.')
            this.setState({
                isLogin: true
            })
        }
    }

    render() {
        const { isLogin } = this.state;
        const loginView = (<div>
            <p>로그인화면</p>
            <button onClick={this.loginWithkakao}>카카오 로그인</button>
        </div>)

        const mainView = (<div>
            <p>메인 화면</p>
            <button onClick={this.logoutWithkakao}>카카오 로그아웃</button>
        </div>)

        return (
            <div className="App">
                {isLogin ? mainView : loginView}
            </div>
        )
    }
}

export default App;