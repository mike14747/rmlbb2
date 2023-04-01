import Image from 'next/image';

export default function Loading() {
    return (
        <div id="loading">
            {/* <img src="/images/loading.gif" alt="Loading" /> */}

            <Image
                src="/images/loading.gif"
                alt="Loading"
                width={128}
                height={128}
            />
        </div>
    );
}
