#Importing the Nominatim geocoder class 
from geopy.geocoders import Nominatim
 
#address we need to geocode
loc = '1 rue Pasteur, 95350, Saint Brice Sous Foret'
 
#making an instance of Nominatim class
geolocator = Nominatim(user_agent="my_request")
 
#applying geocode method to get the location
location = geolocator.geocode(loc)
 
#printing address and coordinates
print(location.address)
print((location.latitude, location.longitude))
