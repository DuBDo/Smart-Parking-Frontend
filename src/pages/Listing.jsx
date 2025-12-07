import { useState } from 'react';
import image1 from '/rent-space/car-with-houses.png';
import image2 from '/rent-space/charging-car.png';
import image3 from '/rent-space/booking-type.png';
import image4 from '/rent-space/space-location.png';
import image5 from '/rent-space/pricing.png';
import image6 from '/rent-space/review-submit.png';
import Image from '../components/listing-process/Image';
import Step1 from '../components/listing-process/Step1';
import Step2 from '../components/listing-process/Step2';
import Step3 from '../components/listing-process/Step3';
import Step4 from '../components/listing-process/Step4';
import Step5 from '../components/listing-process/Step5';
import Step6 from '../components/listing-process/Step6';
import { useParams } from 'react-router';
import Step7 from '../components/listing-process/Step7';

function Listing() {
    const [step, setStep] = useState(1);

    const { name, post } = useParams();

    const parkingType = [
        'Driveway',
        'Car-park',
        'Garage'
    ];

    const [postCode, setPostCode] = useState(post||'');
    const [parkType, setParkType] = useState(parkingType[0]);
    const [count, setCount] = useState(0);
    const [size, setSize] = useState('');

    const [ev, setEV] = useState(false);

    const [address, setAddress] = useState('');

    const [billingType, setBillingType] = useState('');
    const [hourly, setHourly] = useState(100);
    const [daily, setDaily] = useState(400);

    const [phone, setPhone] = useState();
    const [description, setDescription] = useState('');
    const [features, setSpaceFeatures] = useState('');
    const [photos, setPhotos] = useState([]);
    return (
        <div className='flex'>
            {step ==1 &&
            <div className='flex'>
            <Image image={image1} content={'Tell us a little about your space'}/>
            <Step1 
            step={step} setStep={setStep}
            postCode={postCode} setPostCode={setPostCode}
            parkingType={parkingType}
            parkType={parkType} setParkType={setParkType}
            count={count} setCount={setCount}
            setSize={setSize}/>
            </div>
            }

            {step==2 &&
            <div className='flex'>
                <Image image={image2} content={'Support the move to a greener future'}/>

                <Step2  
                setp={step} setStep={setStep}
                ev={ev} setEV={setEV}/>
            </div>
            }

            {step==3 &&
            <div className='flex'>
                <Image image={image3} content={'Space availability'}/>

                <Step3
                step={step} setStep={setStep} 
                />    
            </div>}

            {step==4 &&
            <div className='flex w-full'>
                <Image image={image4} content={'Space location'}/>

                <Step4 step={step} setStep={setStep}
                address={address} setAddress={setAddress}/>
            </div>}
            {step==5 &&
            <div className='flex w-full'>
                <Image image={image5} content={'Space pricing'}/>

                <Step5 step={step} setStep={setStep}
                setBillingType={setBillingType}
                hourly={hourly} setHourly={setHourly}
                daily={daily} setDaily={setDaily}/>
            </div>}
            {step==6 &&
            <div className='flex'>

                <Step6 
                step={step} setStep={setStep}
                phone={phone} setPhone={setPhone}
                description={description} setDescription={setDescription}
                setSpaceFeatures={setSpaceFeatures}
                photos={photos} setPhotos={setPhotos}
                />
            </div>}
            {step==7 &&
            <div className='flex'>
                <Image image={image6} content={"Let's get your listing available for bookings"}/>

                <Step7 name={name}
                step={step} setStep={setStep}
                postCode={postCode} parkType={parkType}
                count={count} size={size}
                ev={ev} address={address}
                hourly={hourly} daily={daily}
                phone={phone} description={description}
                features={features} photos={photos}
                />
            </div>}
        </div>
    )
}

export default Listing