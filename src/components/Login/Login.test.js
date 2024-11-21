import Login from './Login'

describe('Login component test', () => {
    it('Login no empty render', () => {
        const wrapper = shallow(<Login />)
        expect(wrapper.isEmptyRender()).toBe(false)
    })
})
