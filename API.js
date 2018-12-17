import axios from 'axios';

export default axios.create({
	baseURL: `http://ec2-13-125-192-2.ap-northeast-2.compute.amazonaws.com:3000/`
});
