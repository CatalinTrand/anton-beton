# Anton
### Aplicatie de livrat beton printr-un sistem tip licitatie.

## Instructiuni de instalare

### Pasul 1

```
npm install
```


### Pasul 2
Editat node_modules/react-native-maps/lib/blablabla/AirMapModule.java si adaugat functia:

```
@Override    
public boolean canOverrideExistingModule() {        
  return true;    
}
```

in acea clasa.

### Pasul 3
La node_modules/moment/moment.js, codul trebuie inlocuit cu acesta : https://momentjs.com/downloads/moment-with-locales.js