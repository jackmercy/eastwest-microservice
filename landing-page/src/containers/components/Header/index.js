import dynamic from 'next/dynamic';

export default dynamic(() => import('./Header'), { ssr: false });
