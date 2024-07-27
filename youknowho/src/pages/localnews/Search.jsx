import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export const Search = () => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch cities from the backend or use a static list
        setCities(['서울특별시', '부산광역시', '전라남도 여수시', '제주특별자치도 서귀포시', '고양시']);
    }, []);

    useEffect(() => {
        if (selectedCity) {
            // Fetch districts based on selected city
            // Example data, replace with real fetch call
            const cityDistricts = {
                '서울특별시': ['강남구', '강동구', '강북구', '강서구'],
                '부산광역시': ['해운대구', '수영구', '연제구'],
                '전라남도 여수시': ['여서동', '문수동', '미평동'],
                '제주특별자치도 서귀포시': ['서귀동', '송산동', '정방동']
            };
            setDistricts(cityDistricts[selectedCity] || []);
            setSelectedDistrict('');
            setNeighborhoods([]);
            setSelectedNeighborhood('');
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedDistrict) {
            // Fetch neighborhoods based on selected district
            // Example data, replace with real fetch call
            const districtNeighborhoods = {
                '강남구': ['압구정동', '역삼동', '삼성동'],
                '해운대구': ['우동', '중동', '송정동'],
                '여서동': ['여서동1가', '여서동2가'],
                '서귀동': ['서귀동1가', '서귀동2가']
            };
            setNeighborhoods(districtNeighborhoods[selectedDistrict] || []);
            setSelectedNeighborhood('');
        }
    }, [selectedDistrict]);

    const handleSubmit = () => {
        if (selectedCity && selectedDistrict && selectedNeighborhood) {
            // Navigate to Detailnews page with selected data
            navigate('/Localinfo', { state: { city: selectedCity, district: selectedDistrict, neighborhood: selectedNeighborhood } });
        }
    };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
    <h1>궁금하신 지역을 검색해 보세요!</h1>
    <div>
        <select style={selectStyle} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">시 선택</option>
            {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
            ))}
        </select>
    </div>
    <div>
        <select style={selectStyle} value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} disabled={!selectedCity}>
            <option value="">구 선택</option>
            {districts.map((district, index) => (
                <option key={index} value={district}>{district}</option>
            ))}
        </select>
    </div>
    <div>
        <select style={selectStyle} value={selectedNeighborhood} onChange={(e) => setSelectedNeighborhood(e.target.value)} disabled={!selectedDistrict}>
            <option value="">동 선택</option>
            {neighborhoods.map((neighborhood, index) => (
                <option key={index} value={neighborhood}>{neighborhood}</option>
            ))}
        </select>
    </div>
    <button onClick={handleSubmit} disabled={!selectedNeighborhood}>검색</button>
</div>
  )
}

const selectStyle = {
    width: '200px',
    height: '30px',
    overflowY: 'auto',
    display: 'block',
    margin: '10px auto'
};