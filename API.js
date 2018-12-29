import axios from 'axios';

// android localhost
// export default axios.create({
// 	baseURL: `http://10.0.2.2:3000/`
// });

// ec2 linux server
export default axios.create({
	baseURL: `http://ec2-13-209-5-234.ap-northeast-2.compute.amazonaws.com:3000/`
});
