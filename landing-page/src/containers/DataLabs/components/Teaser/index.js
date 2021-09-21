import dynamic from 'next/dynamic';

export default dynamic(() => import('./Teaser'), { ssr: false });
