import dynamic from 'next/dynamic';

export default dynamic(() => import('./NewsAndMedia'), { ssr: false });
