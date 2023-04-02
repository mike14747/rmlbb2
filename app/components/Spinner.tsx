import Image from 'next/image';

type SpinnerSize = {
    size?: 'large' | 'medium' | 'small';
}

type SizesObj = {
    [key: string]: number;
}

const spinnerSizes: SizesObj = {
    large: 128,
    medium: 64,
    small: 32,
};

export default function Spinner({ size = 'large' }: SpinnerSize) {
    return (
        <div className="text-center">
            <Image
                src="/images/loading.gif"
                alt="Loading"
                width={spinnerSizes[size]}
                height={spinnerSizes[size]}
                style={{ margin: '1rem' }}
            />
        </div>
    );
}
