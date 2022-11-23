
class HelloController{
    async index(req, res) {
        return res.json({ hello: 'Tudo Bem!'});
    };
};

export default new HelloController();