import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Highcharts from 'highcharts';
import PieChart from 'highcharts-react-official';
import ObjektService from '../services/ObjektService';
import useLoading from '../hooks/useLoading';
import useError from '../hooks/useError';


export default function Dijagram() {
  const [podaci, setPodaci] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const { prikaziError } = useError();


  async function getPodaci() {
    showLoading();
    const odgovor = await ObjektService.get('Objekt');
    if (!odgovor.ok) {
      hideLoading();
      prikaziError(odgovor.podaci);
      return;
    }

    
    const prilagodeniPodaci = prilagodiPodatke(odgovor.podaci);

    setPodaci(prilagodeniPodaci);
    hideLoading();
  }

  
  function prilagodiPodatke(podaci) {
    const mapaKoristenja = new Map();
    podaci.forEach((objekt) => {
      const vrsta = objekt.vrstaNaziv;
      if (mapaKoristenja.has(vrsta)) {
        mapaKoristenja.set(vrsta, mapaKoristenja.get(vrsta) + 1);
      } else {
        mapaKoristenja.set(vrsta, 1);
      }
    });

    
    const prilagodeniPodaci = Array.from(mapaKoristenja, ([name, y]) => ({ name, y }));
    return prilagodeniPodaci;
  }

  

  useEffect(() => {
    getPodaci();
  }, []);

  return (
    <Container>
      {podaci.length > 0 && (
        <PieChart
          highcharts={Highcharts}
          options={{
            ...fixedOptions,
            series: [
              {
                name: 'Objekti',
                colorByPoint: true,
                data: podaci,
              },
            ],
          }}
        />
      )}
    </Container>
  );
}

const fixedOptions = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },
  title: {
    text: 'Provedba deratizacije po vrstama objekata',
    align: 'left',
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },
  accessibility: {
    enabled: false,
    point: {
      valueSuffix: '%',
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
      },
    },
  },
};
