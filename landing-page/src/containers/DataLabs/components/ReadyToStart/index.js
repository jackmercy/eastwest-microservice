import dynamic from 'next/dynamic';

export default dynamic(() => import('./ReadyToStart'), { ssr: false });
