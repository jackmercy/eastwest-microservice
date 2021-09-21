import dynamic from 'next/dynamic';

export default dynamic(() => import('./Footer'), { ssr: false });
