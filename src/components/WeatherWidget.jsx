import { useEffect, useState } from "react";
import { Sun, CloudSun, Cloud, CloudFog, CloudRain, CloudSnow, CloudLightning, Droplets, Wind, RefreshCw, MapPin } from "lucide-react";

const CITY = { name: "กรุงเทพมหานคร", lat: 13.7563, lon: 100.5018 };

const CODE_ICONS = {
  0: { label: "ท้องฟ้าแจ่มใส", Icon: Sun },
  1: { label: "แจ่มใสเป็นส่วนใหญ่", Icon: Sun },
  2: { label: "มีเมฆบางส่วน", Icon: CloudSun },
  3: { label: "เมฆมาก", Icon: Cloud },
  45: { label: "หมอก", Icon: CloudFog },
  48: { label: "หมอกหนา", Icon: CloudFog },
  51: { label: "ฝนปรอยๆ", Icon: CloudRain },
  53: { label: "ฝนปรอย", Icon: CloudRain },
  55: { label: "ฝนตกปรอย", Icon: CloudRain },
  61: { label: "ฝนตกเล็กน้อย", Icon: CloudRain },
  63: { label: "ฝนตกปานกลาง", Icon: CloudRain },
  65: { label: "ฝนตกหนัก", Icon: CloudRain },
  71: { label: "หิมะตกเล็กน้อย", Icon: CloudSnow },
  73: { label: "หิมะตกปานกลาง", Icon: CloudSnow },
  75: { label: "หิมะตกหนัก", Icon: CloudSnow },
  80: { label: "ฝนตกเป็นช่วงๆ", Icon: CloudRain },
  81: { label: "ฝนตกเป็นบางช่วง", Icon: CloudRain },
  82: { label: "ฝนตกหนักมาก", Icon: CloudRain },
  95: { label: "พายุฟ้าคะนอง", Icon: CloudLightning },
  96: { label: "พายุฟ้าคะนองพร้อมลูกเห็บ", Icon: CloudLightning },
  99: { label: "พายุฟ้าคะนองรุนแรง", Icon: CloudLightning },
};

const getCondition = (code) => CODE_ICONS[code] || { label: "สภาพอากาศทั่วไป", Icon: Cloud };

const WEEKDAYS = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

const fmtHour = (iso) => {
  const d = new Date(iso);
  return `${d.getHours()}:00 น.`;
};

export default function WeatherWidget() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const url =
        `${import.meta.env.VITE_WEATHER_API_URL}?latitude=${CITY.lat}&longitude=${CITY.lon}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
        `&hourly=temperature_2m,weather_code` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
        `&forecast_days=4&timezone=Asia%2FBangkok`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError("ไม่สามารถโหลดข้อมูลสภาพอากาศได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="weather-card weather-loading">
        <RefreshCw size={20} className="spin" />
        <span>กำลังโหลดข้อมูลสภาพอากาศ...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-card weather-loading">
        <span>{error}</span>
        <button className="ghost-btn weather-retry" onClick={load}>ลองใหม่</button>
      </div>
    );
  }

  if (!data) return null;

  const cur = data.current;
  const cond = getCondition(cur.weather_code);
  const CurIcon = cond.Icon;

  const nextHours = data.hourly.temperature_2m
    .map((t, i) => ({ t, code: data.hourly.weather_code[i], time: data.hourly.time[i] }))
    .filter((h) => new Date(h.time) >= new Date())
    .slice(0, 4);

  const forecast = data.daily.time.slice(1).map((day, i) => {
    const c = getCondition(data.daily.weather_code[i + 1]);
    return {
      day: WEEKDAYS[new Date(day + "T00:00:00").getDay()],
      label: c.label,
      Icon: c.Icon,
      max: data.daily.temperature_2m_max[i + 1],
      min: data.daily.temperature_2m_min[i + 1],
    };
  });

  return (
    <div className="weather-card">
      <div className="weather-main">
        <div className="weather-cond">
          <CurIcon size={46} />
          <div>
            <strong className="weather-temp">{Math.round(cur.temperature_2m)}°C</strong>
            <span className="weather-cond-label">{cond.label}</span>
          </div>
        </div>
        <div className="weather-city">
          <MapPin size={15} />
          <span>{CITY.name}</span>
          <small>รู้สึกเหมือน {Math.round(cur.apparent_temperature)}°C</small>
        </div>
      </div>

      <div className="weather-stats">
        <div className="weather-stat">
          <Droplets size={18} />
          <div><strong>{cur.relative_humidity_2m}%</strong><span>ความชื้น</span></div>
        </div>
        <div className="weather-stat">
          <Wind size={18} />
          <div><strong>{Math.round(cur.wind_speed_10m)} กม./ชม.</strong><span>ลม</span></div>
        </div>
      </div>

      <div className="weather-hours">
        {nextHours.map((h, i) => (
          <div className="weather-hour" key={i}>
            <span>{fmtHour(h.time)}</span>
            <strong>{Math.round(h.t)}°C</strong>
          </div>
        ))}
      </div>

      <div className="weather-forecast">
        {forecast.map((f, i) => {
          const FIcon = f.Icon;
          return (
            <div className="weather-day" key={i}>
              <span className="weather-day-name">{f.day}</span>
              <FIcon size={20} />
              <strong>{Math.round(f.max)}°</strong>
              <small>{Math.round(f.min)}°</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}