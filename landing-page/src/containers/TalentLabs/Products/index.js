import dynamic from 'next/dynamic';

export default dynamic(() => import('./Products'), { ssr: false });
