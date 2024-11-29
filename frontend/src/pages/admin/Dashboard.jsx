import React, { useEffect, useState } from 'react';
import CurveLine from '../../components/apexCharts/CurveLine';
import Bar from '../../components/apexCharts/Bar';
import ApexChart from '../../components/apexCharts/Basic'; // Import the ApexChart component
import axios from 'axios';
import SingleBar from '../../components/apexCharts/SingleBar';

const Dashboard = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await axios.get('http://localhost:7684/api/showAllProduct');
      if (response.status === 200) {
        setProduct(response.data.products);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <h3>Dashboard</h3>
      <div style={{ marginBottom: '20px' }}>
        <ApexChart height={300} /> {/* Adjust the height here */}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <CurveLine height={300} /> {/* Adjust the height here */}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Bar height={300} /> {/* Adjust the height here */}
      </div>
    </>
  );
};

export default Dashboard;
